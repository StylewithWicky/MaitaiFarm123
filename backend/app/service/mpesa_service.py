import requests
import base64
from datetime import datetime
from backend.app.core.config import settings

class MpesaService:
    @staticmethod
    def get_access_token():
        url=(

            "grant_type=client_credentials"
        )
        response=requests.get(url,auth=(settings.DARAJA_CONSUMER_KEY, settings.DARAJA_CONSUMER_SECRET))
        return response.json()['access_token']
    
    @staticmethod
    def stk_push(phone,amount):
        token=MpesaService.get_access_token()
        timestamp=datetime.now().strftime('')

        password=base64.b64encode(
            (settings.MPESA_SHORTCODE + settings.MPESA_PASSKEY + timestamp).encode()).decode()
        
        headers={'Authorization':f'Bearer {token}'}
        payload={
            'BuisnessShortCode':settings.MPESA_SHORTCODE,
            'Password':password,
            'Timestamp':timestamp,
            'TransactionType':' CustomerPayBillOnline',
            'Amount':amount,
            'PartyA':phone,
            'PartyB':settings.MPESA_SHORTCODE,
            'PhoneNumber':phone,
            'CallBackURL':settings.CALLBACK_URL
            
            
            
        }
        