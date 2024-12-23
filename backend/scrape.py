import requests
from bs4 import BeautifulSoup
import csv

fields = ['id', 'name'] 
data = []
links = ['https://www.espncricinfo.com/cricketers/team/india-6', 'https://www.espncricinfo.com/cricketers/team/afghanistan-40', 
         'https://www.espncricinfo.com/cricketers/team/australia-2', 'https://www.espncricinfo.com/cricketers/team/bangladesh-25',
         'https://www.espncricinfo.com/cricketers/team/england-1', 'https://www.espncricinfo.com/cricketers/team/new-zealand-5',
         'https://www.espncricinfo.com/cricketers/team/pakistan-7', 'https://www.espncricinfo.com/cricketers/team/south-africa-3',
         'https://www.espncricinfo.com/cricketers/team/sri-lanka-8', 'https://www.espncricinfo.com/cricketers/team/west-indies-4']

for link in links:
    url = requests.get(link)

    soup = BeautifulSoup(url.text, 'html.parser')
    tags = soup.find_all('a', class_='ds-inline-flex ds-items-start ds-leading-none')
    for i in tags:
        profile = i.get('href')
        if profile.startswith('/cricketers/'):
            profile = profile[12:]
            l = profile.split('-')
            name = ''
            for i in range(0, len(l)-1):
                name += l[i].capitalize()
                name += ' '
            name = name[:-1]
            id = int(l[-1])
            new_row = [id, name]
            data.append(new_row)

with open('data.csv', 'w', newline='') as f:
    write = csv.writer(f)
    write.writerow(fields)
    write.writerows(data)