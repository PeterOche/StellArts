# Service exports for easy importing


class NotificationService:
    @staticmethod
    def dispatch_smart_pitch(artisan, booking, pitch_message):
        return {
            "artisan_id": artisan.id,
            "booking_id": booking.id,
            "message": pitch_message,
            "status": "dispatched",
        }

    @staticmethod
    async def dispatch_to_matched_artisans(db, booking, limit=5):
        return []

    @staticmethod
    def dispatch_push_notification(artisan_id: int, message: str):
        # Mock push notification dispatch
        print(f"[PUSH NOTIFICATION] Artisan {artisan_id}: {message}")
        return {
            "artisan_id": artisan_id,
            "message": message,
            "status": "pushed",
        }


notification_service = NotificationService()
