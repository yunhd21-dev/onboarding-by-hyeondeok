# ToDo List App

## 개발환경

- [Webpack](https://webpack.kr/)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)

## ToDo List App 실행

```
npm run start
```

## Storybook 실행

```
npm run storybook
```

## Jest(단위 테스트) 실행

```
npm run test
```

## Cypress(E2E 테스트) 실행

```
npm run cy:open
```

## 요구사항
### 기본 동작
* UI는 TO-DO 입력부와 TO-DO 목록 출력부, 정보 출력부로 나뉜다.
* TO-DO는 [완료 전], [완료] 두 가지 상태를 가진다. (기본값 : 완료 전)

> TO-DO 입력부
* TO-DO 입력 받을 수 있는 input요소가 있다.
* 텍스트로 TO-DO를 입력하고 Enter키를 누르면 TO-DO를 등록할 수 있다.
* 등록된 TO-DO는 TO-DO 목록 상단에 추가되며, 등록과 동시에 입력했던 TO-DO 텍스트의 내용은 초기화된다.

> TO-DO 목록 출력부
* 등록된 TO-DO 목록이 출력된다.
* TO-DO는 등록순으로 정렬되어 최근에 등록한 TO-DO 항목이 목록의 상단에 위치한다.
* TO-DO는 아래와 같이 구성된다.
  - 완료 여부를 나타내는 checkbox요소가 있다.
  - TO-DO 내용을 나타내는 텍스트가 표시된다.
* 체크박스를 클릭하여 완료 처리할 수 있으며, 토글 방식으로 상태를 변경할 수 있다.
  - 체크 : [완료]
  - 체크해제 : [완료 전] - 기본값
* 완료된 TO-DO는 TO-DO 목록의 하단으로 이동하며, 이미 완료된 TO-DO를 다시 [완료 전] 상태로 변경하면 TO-DO 목록 상단으로 다시 이동한다.
  - TO-DO목록은 ul요소 하나만 사용한다.
* 완료된 TO-DO 항목은 취소선과 폰트 컬러를 변경하여 시각적으로 다르게 표시한다.

> 하단 정보 출력부
* 현재 남아있는 완료 전 TO-DO 항목의 갯수를 출력한다.
* [전체], [완료 전], [완료됨] 의 탭으로 TO-DO 목록을 필터해 볼 수 있는 기능을 제공한다.
* 완료 항목 삭제 기능을 제공한다.

> 드래그 앤 드롭
* 이미 만들어진 TO-DO 항목을 다른 위치로 Drag & Drop하여 목록 내부 순서를 바꿀 수 있다.
* 드래그할 때, 어디로 이동 되는지 가이드 엘리먼트가 나타난다.
* 목록 외부로 드롭 하는 경우 드래그가 취소된다.
* 드래그 도중 ESC 키를 누른 경우 드래그가 취소된다.

## src

```
├── components
│   ├── button.js
│   ├── card.js
│   ├── index.js
│   ├── input.js
│   ├── itemlist
│   │   ├── item.js
│   │   └── itemlist.js
│   └── statusbar.js
├── index.html
├── index.js
├── services
│   ├── dndservice.js
│   ├── index.js
│   ├── storageservice.js
│   └── todoservice.js
├── styles.css
└── todolistapp.js
```

## Diagram
<img width="657" height="762" alt="image" src="https://github.com/user-attachments/assets/23a0be02-10cb-40b7-802e-e79cc43f15f4" />
