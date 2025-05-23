-- status 컬럼 추가
ALTER TABLE reservations ADD COLUMN status TEXT DEFAULT 'pending';
