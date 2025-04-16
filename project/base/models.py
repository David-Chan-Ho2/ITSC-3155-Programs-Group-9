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
    


class Event(models.Model):
    title = models.CharField(max_length=255)
    start = models.DateTimeField()
    end = models.DateTimeField()
    description = models.TextField(blank=True)
    all_day = models.BooleanField(default=False)
    color = models.CharField(max_length=7, help_text="Hex code for text color (e.g., #FF5733)")
    background_color = models.CharField(max_length=7, help_text="Hex code for background color (e.g., #C70039)")
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'event'
        ordering = ['start']

    def __str__(self):
        return self.title

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
    
    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            Room.objects.create(project=self)
         

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
    TYPE_CHOICES = [
        ('pdf', 'PDF'),
        ('doc', 'DOC'),
        ('txt', 'Text')
    ]

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, null=True, blank=True, related_name='documents', on_delete=models.CASCADE)
    project = models.ForeignKey(Project, null=True, blank=True, related_name='documents', on_delete=models.CASCADE)
    file_path = models.FileField(upload_to='documents/')
    type = models.CharField(blank=True, null=True, max_length=10, choices=TYPE_CHOICES)
    title = models.CharField(blank=True,  null=True, max_length=255)
    size = models.BigIntegerField(blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'document'
        ordering = ['-updated']

    def __str__(self):
        return f"{self.title} ({self.type})"
    
    def save(self, *args, **kwargs):
        if self.file_path:
            # Auto-set title from file name if not set
            if not self.title:
                base_name = os.path.basename(self.file_path.name)
                self.title = os.path.splitext(base_name)[0]

            # Auto-set size
            if not self.size:
                self.size = self.file_path.size

            # Auto-set type from file extension
            ext = os.path.splitext(self.file_path.name)[1][1:].lower()
            known_types = dict(self.TYPE_CHOICES).keys()
            self.type = ext if ext in known_types else 'other'
        
        super().save(*args, **kwargs)
    


class Room(models.Model):
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    host = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    participants = models.ManyToManyField(
        User, related_name='participants', blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.name


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.body[0:50]

