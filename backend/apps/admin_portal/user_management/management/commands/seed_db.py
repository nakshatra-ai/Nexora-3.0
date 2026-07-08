from django.core.management.base import BaseCommand
from apps.admin_portal.user_management.models import User
from apps.customer.profile.models.profile import CustomerProfile
from apps.customer.service_requests.models.request import ServiceRequest
from apps.customer.service_requests.models.feedback import Feedback
from apps.engineer.profile.models.profile import EngineerProfile
from apps.engineer.assignment.models.task import TaskAssignment

class Command(BaseCommand):
    help = 'Seeds the database with 1 of everything for testing the multi-DB architecture.'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting DB Seeding Process...")

        # 1. Create Admin
        if not User.objects.filter(email='admin@nexora.com').exists():
            admin_user = User.objects.create_superuser('admin@nexora.com', 'admin123')
            self.stdout.write(self.style.SUCCESS("Created Admin User"))

        # 2. Create Customer
        if not User.objects.filter(email='customer@nexora.com').exists():
            customer_user = User.objects.create_user('customer@nexora.com', 'customer123', role='Customer')
            CustomerProfile.objects.create(
                user_id=customer_user.id,
                phone_number="+1 555-0199",
                address="123 Broadband Ave, Tech City",
                subscription_plan="Premium Gigabit"
            )
            self.stdout.write(self.style.SUCCESS("Created Customer User & Profile"))

        # 3. Create Engineer
        if not User.objects.filter(email='engineer@nexora.com').exists():
            engineer_user = User.objects.create_user('engineer@nexora.com', 'engineer123', role='Engineer')
            EngineerProfile.objects.create(
                user_id=engineer_user.id,
                specialization="Fiber Optics & 5G Base Stations",
                availability_status="Available",
                rating=4.9
            )
            self.stdout.write(self.style.SUCCESS("Created Engineer User & Profile"))

        # Retrieve them for relations
        customer = User.objects.get(email='customer@nexora.com')
        customer_profile = CustomerProfile.objects.get(user_id=customer.id)
        
        engineer = User.objects.get(email='engineer@nexora.com')
        engineer_profile = EngineerProfile.objects.get(user_id=engineer.id)

        # 4. Create 1 Pending Service Request
        req_pending, _ = ServiceRequest.objects.get_or_create(
            customer_id=customer_profile.id,
            title="Router constantly dropping connection",
            description="Since yesterday, the router drops connection every 5 minutes.",
            status="Pending"
        )
        self.stdout.write(self.style.SUCCESS("Created Pending Service Request"))

        # 5. Create 1 Assigned Service Request + Task Assignment
        req_assigned, created = ServiceRequest.objects.get_or_create(
            customer_id=customer_profile.id,
            title="Install new 5G Receiver",
            description="Need installation of the outdoor 5G receiver at the roof.",
            status="In Progress"
        )
        if created:
            TaskAssignment.objects.create(
                engineer_id=engineer_profile.id,
                service_request_id=req_assigned.id,
                status="In Progress",
                notes="Bringing tall ladder and specialized mounting brackets."
            )
        self.stdout.write(self.style.SUCCESS("Created Assigned Service Request & Task"))

        # 6. Create 1 Past (Completed) Service Request + Feedback
        req_past, created = ServiceRequest.objects.get_or_create(
            customer_id=customer_profile.id,
            title="Fiber Optic Cable Cut",
            description="The landscaping crew cut the underground fiber optic line.",
            status="Completed"
        )
        if created:
            Feedback.objects.create(
                service_request=req_past,
                rating=5,
                comments="The engineer fixed it perfectly and hid the cable better this time. 10/10!"
            )
        self.stdout.write(self.style.SUCCESS("Created Past Service Request & Feedback"))

        self.stdout.write(self.style.SUCCESS("All mock data seeded successfully across all 3 databases!"))
