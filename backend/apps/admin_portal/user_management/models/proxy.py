from django.contrib.auth import get_user_model
from apps.customer.profile.models.profile import CustomerProfile
from apps.customer.service_requests.models.request import ServiceRequest
from apps.customer.service_requests.models.feedback import Feedback
from apps.engineer.profile.models.profile import EngineerProfile
from apps.engineer.assignment.models.task import TaskAssignment

User = get_user_model()

class CustomerAccount(User):
    class Meta:
        proxy = True
        verbose_name = "Customer Account"
        verbose_name_plural = "Customer Accounts"

class CustomerProfileProxy(CustomerProfile):
    class Meta:
        proxy = True
        verbose_name = "Customer Profile"
        verbose_name_plural = "Customer Profiles"

class CustomerRequest(ServiceRequest):
    class Meta:
        proxy = True
        verbose_name = "Customer Request"
        verbose_name_plural = "Customer Requests"

class CustomerFeedback(Feedback):
    class Meta:
        proxy = True
        verbose_name = "Customer Feedback"
        verbose_name_plural = "Customer Feedbacks"

class EngineerAccount(User):
    class Meta:
        proxy = True
        verbose_name = "Engineer Account"
        verbose_name_plural = "Engineer Accounts"

class EngineerProfileProxy(EngineerProfile):
    class Meta:
        proxy = True
        verbose_name = "Engineer Profile"
        verbose_name_plural = "Engineer Profiles"

class EngineerAssignedRequest(TaskAssignment):
    class Meta:
        proxy = True
        verbose_name = "Engineer Assigned Request"
        verbose_name_plural = "Engineer Assigned Requests"
