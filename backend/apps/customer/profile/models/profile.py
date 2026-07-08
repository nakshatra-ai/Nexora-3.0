from django.db import models

class CustomerProfile(models.Model):
    user_id = models.IntegerField(unique=True, help_text="References User ID in the Admin Database")
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    subscription_plan = models.CharField(max_length=50, default="Standard")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Customer Profile for User {self.user_id}"
