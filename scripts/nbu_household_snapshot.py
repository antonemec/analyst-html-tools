#!/usr/bin/env python3
"""Оновлення знімка структури кредитів домогосподарствам з відкритого API НБУ.
Refresh the household loan structure snapshot used by nbu-market.html.

Використання / Usage:  python3 scripts/nbu_household_snapshot.py 20260601
Лише стандартна бібліотека / standard library only. Набір "loan" ~16 МБ на дату.
Виведіть значення в константу SNAP у nbu-market.html (млн грн).
"""
import json, sys, urllib.request

date = sys.argv[1] if len(sys.argv) > 1 else "20260601"
url = f"https://bank.gov.ua/NBUStatService/v1/statdirectory/loan?date={date}&json"
with urllib.request.urlopen(url, timeout=120) as r:
    rows = json.load(r)

IDS = ["Loans_Households_Consumer", "Loans_Households_Mortgage", "Loans_Households_Vehicle",
       "Loans_Households_OthLending", "Loans_Households_FinLeasing"]

def total(id_api):
    for x in rows:
        if (x["id_api"] == id_api and x["odr030"] == "total" and x["ods183ld"] == "total"
                and x["odkodter"] == "total"):
            return x["value"]
    return None

items = [total(i) for i in IDS]
tot = total("Loans_Households")
print(f'const SNAP={{date:"{date[:4]}-{date[4:6]}-{date[6:]}",total:{tot},items:{items}}};')
