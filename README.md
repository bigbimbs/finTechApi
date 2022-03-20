# finTechApi
### Flutterwave Challenge

## run Node index to start the server

## Fee setup endpoint
## HTTP POST /fees
## Sample Post Data
### {
   "FeeConfigurationSpec": "LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55"
### }

## Http Response
### HTTP 200 OK
### {
###  "status": "ok"
### }

## Fee computation endpoint
## HTTP POST /compute-transaction-fee

## Sample payload:
### {
    "ID": 91203,
    "Amount": 5000,
    "Currency": "NGN",
    "CurrencyCountry": "NG",
    "Customer": {
        "ID": 2211232,
        "EmailAddress": "anonimized29900@anon.io",
        "FullName": "Abel Eden",
        "BearsFee": true
    },
    "PaymentEntity": {
        "ID": 2203454,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }
### }

## Sample response below:

### HTTP 200 OK
### {
    "AppliedFeeID": "LNPY0222",
    "AppliedFeeValue": 230,
    "ChargeAmount": 5230,
    "SettlementAmount": 5000
### }

## The api live base url https://bigbimbs-fintech-api-2022.herokuapp.com/

##
