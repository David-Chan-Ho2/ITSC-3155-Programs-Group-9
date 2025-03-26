# Generated by Django 5.1.5 on 2025-03-26 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0007_task_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="profile_picture",
            field=models.ImageField(
                blank=True,
                default="profile_pics/default_avatar.png",
                null=True,
                upload_to="profile_pics/",
            ),
        ),
    ]
