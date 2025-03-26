from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_nested import routers

router = routers.DefaultRouter()

# Projects
router.register(r'projects', views.ProjectViewSet, basename='projects')

# Tasks
projects_router = routers.NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'tasks', views.TaskViewSet, basename='project-tasks')
router.register(r'tasks', views.TaskViewSet)

router.register(r'rooms', views.RoomViewSet)
router.register(r'documents', views.DocumentViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'users', views.UserViewSet)
# router.register(r'register', views.RegisterUserViewSet)

urlpatterns = router.urls +  projects_router.urls + [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
