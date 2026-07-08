from django.db import models

class TaskAssignment(models.Model):
    engineer_id = models.IntegerField(help_text="References EngineerProfile ID")
    service_request_id = models.IntegerField(help_text="References ServiceRequest ID in Customer Database")
    assigned_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Pending')
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Task for Request {self.service_request_id} assigned to Engineer {self.engineer_id}"
