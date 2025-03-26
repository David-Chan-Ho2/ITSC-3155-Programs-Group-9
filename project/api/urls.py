from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'rooms', views.RoomViewSet)
router.register(r'documents', views.DocumentViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'tasks', views.TaskViewSet)
router.register(r'users', views.UserViewSet)
# router.register(r'register', views.RegisterUserViewSet)

urlpatterns = router.urls +  [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
