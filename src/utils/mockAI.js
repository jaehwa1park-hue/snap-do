import { v4 as uuidv4 } from 'uuid';

const CATEGORIES = ['Work', 'Personal', 'Study', 'Etc'];

function randomCategory() {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

const templates = {
  운동: {
    title: '오늘의 운동 플랜',
    tasks: ['스트레칭 10분 하기', '본 운동 30분 진행', '쿨다운 및 정리 운동'],
  },
  공부: {
    title: '학습 계획 정리',
    tasks: ['학습 목표 설정하기', '핵심 자료 읽고 정리', '복습 및 요약 작성'],
  },
  요리: {
    title: '요리 준비 리스트',
    tasks: ['레시피 검색 및 선정', '재료 준비하기', '요리 후 정리정돈'],
  },
  청소: {
    title: '집 청소 계획',
    tasks: ['정리정돈 및 분류', '청소기 돌리고 물걸레질', '쓰레기 분리수거'],
  },
  여행: {
    title: '여행 준비 체크리스트',
    tasks: ['숙소 및 교통편 예약', '짐 싸기 및 준비물 체크', '여행 일정 최종 확인'],
  },
  쇼핑: {
    title: '쇼핑 리스트 정리',
    tasks: ['필요한 물품 목록 작성', '가격 비교 및 검색', '구매 및 결제 완료'],
  },
  독서: {
    title: '독서 플랜',
    tasks: ['읽을 책 선정하기', '매일 30분 독서하기', '독후감 작성하기'],
  },
};

function getDefaultTemplate(keyword) {
  return {
    title: `${keyword} 할 일 정리`,
    tasks: [
      `${keyword} 관련 정보 조사하기`,
      `${keyword} 세부 계획 세우기`,
      `${keyword} 실행 및 완료하기`,
    ],
  };
}

export { CATEGORIES };

export function generateSnap(keyword) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const trimmed = keyword.trim();
      const matchedKey = Object.keys(templates).find((key) =>
        trimmed.includes(key),
      );
      const template = matchedKey
        ? templates[matchedKey]
        : getDefaultTemplate(trimmed);

      resolve({
        title: template.title,
        category: randomCategory(),
        tasks: template.tasks.map((text) => ({
          id: uuidv4(),
          text,
          done: false,
        })),
      });
    }, 2000);
  });
}
