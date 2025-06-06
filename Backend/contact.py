
from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()

# Twilio credentials from environment
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')
NOTIFICATION_NUMBER = os.getenv('NOTIFICATION_NUMBER')


def send_sms_notification(contact):


    twilio_client = None
    if TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN:
        twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        print("Twilio client initialized.")
    else:
        print("Twilio credentials missing. SMS will not be sent.")

    data = {}
    if hasattr(contact, 'dict'):
        data = contact.dict()
    else:
        data = dict(contact)

    """Send SMS notification."""
    if not twilio_client:
        print("Twilio client not initialized.")
        return False

    if not TWILIO_PHONE_NUMBER or not NOTIFICATION_NUMBER:
        print("Twilio phone numbers not configured.")
        return False
        
    # Check if the numbers are the same
    if TWILIO_PHONE_NUMBER == NOTIFICATION_NUMBER:
        print("Twilio error: 'To' and 'From' numbers cannot be the same.")
        return False

    try:

        sms_body = (
            f"🔔 New Contact Form Submission\n"
            f"👤 Name: {data['name']}\n"
            f"📧 Email: {data['email']}\n"
            f"📱 soi: {data['soi']}\n"
            f"💬 Message: {data['message']}"
        )

        sms = twilio_client.messages.create(
            body=sms_body,
            from_=TWILIO_PHONE_NUMBER,
            to=NOTIFICATION_NUMBER
        )

        print(f"SMS sent. SID: {sms.sid}, Status: {sms.status}")
        if sms.error_message:
            print(f"SMS Error: {sms.error_message}")
        return {"status": "success", "message": "SMS sent successfully"}
    except Exception as e:
        print(f"Failed to send SMS: {str(e)}")
        return {"status": "error", "message": "Failed to send SMS"}
