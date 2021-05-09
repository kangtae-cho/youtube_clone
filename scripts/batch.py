import boto3
import psycopg2
import json
from datetime import datetime, timedelta



client = boto3.client('s3')

now = datetime.now() - timedelta(hours=1)

year, month, day, hour = now.year, now.month, now.day, now.hour


response = client.list_objects_v2(
    Bucket='youtube.kangtae.log',
    Prefix='logs/{}/{}/{}/{}/'.format(year, month, day, hour),
)

video_view_dict = {}
key_list = []
for cnt in response['Contents']:
    key = cnt['Key']
    key_list.append({
        'Key': key
    })
    video_id = key.split('_')[-1]
    if video_id not in video_view_dict:
        video_view_dict[video_id] = 0
    video_view_dict[video_id] += 1

with open('../db_constant.json') as config_file:
    db_config = json.load(config_file)
conn = psycopg2.connect(
    database=db_config['PG_DATABASE'], 
    user=db_config['PG_USER'], 
    password=db_config['PG_PASSWORD'], 
    host=db_config['PG_HOST'],
    port=db_config['PG_PORT'])

cursor = conn.cursor()

for key in video_view_dict:
    sql = """
        UPDATE youtube_user.video 
        SET view_cnt = view_cnt + {} WHERE video_id = {}
    """.format(video_view_dict[key], key)
    cursor.execute(sql)

conn.commit()
cursor.close()
conn.close()

response = client.delete_objects(
    Bucket='youtube.kangtae.log',
    Delete={
        'Objects': key_list
    }
)