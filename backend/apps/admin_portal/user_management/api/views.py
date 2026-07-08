from rest_framework import viewsets, status, views
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from apps.customer.profile.models.profile import CustomerProfile
from apps.engineer.profile.models.profile import EngineerProfile

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class RegisterView(views.APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            role = serializer.validated_data.get('role', 'Customer')
            phone_number = serializer.validated_data.get('phone_number', '')

            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

            # Create User in Admin DB
            user = User.objects.create_user(email=email, password=password, role=role)

            # Create Profile in respective DB
            try:
                if role == 'Customer':
                    CustomerProfile.objects.using('customer').create(user_id=user.id, phone_number=phone_number)
                elif role == 'Engineer':
                    EngineerProfile.objects.using('engineer').create(user_id=user.id)
            except Exception as e:
                # If profile creation fails, delete user to maintain consistency
                user.delete()
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({
                'message': 'Registration successful',
                'user': {'id': user.id, 'email': user.email, 'role': user.role}
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(username=email, password=password)
            if user:
                return Response({
                    'message': 'Login successful',
                    'user': {'id': user.id, 'email': user.email, 'role': user.role, 'name': user.first_name}
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
