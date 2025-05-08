from django.contrib.auth.models import AbstractUser
from django.db import models
from PIL import Image
import os

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('editor', 'Editor'),
        ('viewer', 'Viewer'),
    ]
    
    username = None
    first_name = models.TextField(max_length=16)
    last_name = models.TextField(max_length=16)
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True,default='profile_pics/default_avatar.png')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='viewer')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
   
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.profile_picture:
            img = Image.open(self.profile_picture.path)

            # Resize logic
            max_size = (16, 16)
            if img.height > 16 or img.width > 16:
                img.thumbnail(max_size)

                img.save(self.profile_picture.path)
    

class Project(models.Model):
    STATUS_CHOICES = [
        ('planned', 'Planned'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold')
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    manager = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='owned_projects',
        blank=True,
        null=True
    )
    members = models.ManyToManyField(
        User,
        related_name='collaborations',
        blank=True,
        null=True
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planned')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'project'
        ordering = ['name']

    def __str__(self):
        return self.name
    

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'task'
        ordering = ['title']

    def __str__(self):
        return self.title

class Document(models.Model):
    id = models.AutoField(primary_key=True)
    file_path = models.FileField(upload_to='documents/')
    title = models.CharField(blank=True,  null=True, max_length=255)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'document'
        ordering = ['-updated']

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.file_path:
            # Auto-set title from file name if not set
            if not self.title:
                base_name = os.path.basename(self.file_path.name)
                self.title = os.path.splitext(base_name)[0]
        
        super().save(*args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        print("FILES:", request.FILES)
        print("DATA:", request.data)
        return super().post(request, *args, **kwargs)
 

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['updated', 'created']

    def __str__(self):
        return self.body[0:50]

