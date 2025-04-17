from rest_framework import filters
from base.models import User, Document, Event, Project, Task, Room
from .serializers import DocumentSerializer, EventSerializer, ProjectSerializer, RegisterSerializer, TaskSerializer, UserSerializer, RoomSerializer, MessageCreateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from base.permissions import IsAdminRole
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework import generics

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated!"})

class AdminOnlyView(APIView):
    permission_classes = [IsAdminRole]

    def get(self, request):
        return Response({"message": "You are an admin and have access to this view!"})

# User
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['email', 'first_name', 'last_name']
    
# Register user
class RegisterUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Document Views
class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

# Event Views
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

# Project Views
class ProjectViewSet(viewsets.ModelViewSet):    
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

# Task Views
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project']

# Room Views
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomMessageCreateView(generics.CreateAPIView):
    serializer_class = MessageCreateSerializer

    