from django.shortcuts import render
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer
from rest_framework import viewsets, status


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-id')
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        print(request.query_params.get('description'))
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
