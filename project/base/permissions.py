from rest_framework import permissions

class IsAdminRole(permissions.BasePermission):
    """
    Custom permission to only allow users with the 'admin' role to access the view.
    """
    def has_permission(self, request, view):
        return request.user.role == 'admin'
