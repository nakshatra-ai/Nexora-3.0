from django.contrib import admin
from .models.proxy import (
    CustomerAccount, CustomerProfileProxy, CustomerRequest, CustomerFeedback,
    EngineerAccount, EngineerProfileProxy, EngineerAssignedRequest
)

@admin.register(CustomerAccount)
class CustomerAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'date_joined')
    search_fields = ('email',)
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(role='Customer')

@admin.register(CustomerProfileProxy)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'phone_number', 'subscription_plan', 'created_at')
    search_fields = ('user_id', 'phone_number')

@admin.register(CustomerRequest)
class CustomerRequestAdmin(admin.ModelAdmin):
    list_display = ('title', 'customer_id', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('title', 'customer_id')

@admin.register(CustomerFeedback)
class CustomerFeedbackAdmin(admin.ModelAdmin):
    list_display = ('service_request', 'rating', 'created_at')
    list_filter = ('rating',)

@admin.register(EngineerAccount)
class EngineerAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'date_joined')
    search_fields = ('email',)
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(role='Engineer')

@admin.register(EngineerProfileProxy)
class EngineerProfileAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'specialization', 'availability_status', 'rating')
    list_filter = ('availability_status',)
    search_fields = ('user_id', 'specialization')

@admin.register(EngineerAssignedRequest)
class EngineerAssignedRequestAdmin(admin.ModelAdmin):
    list_display = ('service_request_id', 'engineer_id', 'status', 'assigned_at')
    list_filter = ('status',)
    search_fields = ('service_request_id', 'engineer_id')
