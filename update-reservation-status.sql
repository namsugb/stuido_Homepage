-- 기존 상태 값을 새로운 상태 값으로 변환하는 SQL 스크립트

-- 'pending' 상태를 '신규문의'로 변경
UPDATE reservations SET status = '신규문의' WHERE status = 'pending';

-- 'confirmed' 상태를 '예약확정'으로 변경
UPDATE reservations SET status = '예약확정' WHERE status = 'confirmed';

-- 'completed' 상태를 '촬영완료'로 변경
UPDATE reservations SET status = '촬영완료' WHERE status = 'completed';

-- 상태가 없는 레코드에 '신규문의' 상태 부여
UPDATE reservations SET status = '신규문의' WHERE status IS NULL;

-- 상태 컬럼이 없는 경우 컬럼 추가
-- ALTER TABLE reservations ADD COLUMN status TEXT DEFAULT '신규문의';
