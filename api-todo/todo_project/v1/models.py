from django.db import models


class Task(models.Model):
    description = models.CharField(max_length=255)
    status = models.BooleanField(default=False)
