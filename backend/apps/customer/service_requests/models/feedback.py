from django.db import models
from .request import ServiceRequest

class Feedback(models.Model):
    service_request = models.OneToOneField(ServiceRequest, on_delete=models.CASCADE, related_name="feedback")
    rating = models.IntegerField(help_text="Rating from 1 to 5")
    comments = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for Request {self.service_request.id}"
