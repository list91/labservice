curl -X POST http://localhost:3000/create_item -H "Content-Type: application/json" -d '{
  "time": "2024-07-24 14:30:00",
  "name": "lab item 1",
  "type_item": {
    "type_name": "тип1"
  },
  "section": {
    "section_name": "test section"
  },
  "grade_num": {
    "grade_num": 2
  },
  "count": 3,
  "crash_count": 1,
  "img": "/home/user/link-preview.svg",
  "document_item": "/home/user/Загрузки/Telegram Desktop/ШУ Алтай/РЭ УС серии Алтай.pdf",
  "location_item": {
    "location_name": "л2п"
  }
}'