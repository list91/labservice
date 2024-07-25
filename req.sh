  curl -X POST http://localhost:3000/create_item \
  -F 'time=2024-07-24 14:30:00' \
  -F 'name=lab item 1' \
  -F 'type_item[type_name]=тип1' \
  -F 'section[section_name]=test section' \
  -F 'grade_num[grade_num]=2' \
  -F 'count=3' \
  -F 'crash_count=1' \
  -F 'location_item[location_name]=л2п' \
  -F 'files=@/home/user/link-preview.svg' \
  -F 'files=@/home/user/Загрузки/Telegram Desktop/ШУ Алтай/РЭ УС серии Алтай.pdf'

  curl -X DELETE localhost:3000/6 