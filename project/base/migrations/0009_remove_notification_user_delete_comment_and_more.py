# Generated by Django 5.1.5 on 2025-03-28 13:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0008_user_profile_picture"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="notification",
            name="user",
        ),
        migrations.DeleteModel(
            name="Comment",
        ),
        migrations.DeleteModel(
            name="Notification",
        ),
    ]
