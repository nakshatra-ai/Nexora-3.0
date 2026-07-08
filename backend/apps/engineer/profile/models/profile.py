from django.db import models

class EngineerProfile(models.Model):
    user_id = models.IntegerField(unique=True, help_text="References User ID in the Admin Database")
    specialization = models.CharField(max_length=100)
    availability_status = models.CharField(max_length=50, default='Available')
    rating = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Engineer Profile for User {self.user_id}"
