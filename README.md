# 추석 음식 피하기

추석 연휴, 하늘에서 떨어지는 추석 음식으로부터 도망치세요!

## 게임 설명

- 캐릭터가 추석 음식에 닿으면 생명력이 감소합니다.
  생명력이 감소는 음식의 칼로리에 따라 잡채(-15), 송편(-20), 밥(-25), 파전(-30), 불고기(-35) 정해진 수치가 감소됩니다.
- 캐릭터가 움직인 거리에 비례하여 생명력이 회복됩니다. 
  음식을 먹었다면 가만히 있지말고 최대한 움직여 생명력을 회복하세요!
- 게임이 종료되면 닉네임을 입력하고 저장을 눌러 스코어를 기록할 수 있습니다.
  최대한 오래 살아 남아 1등을 달성하세요! 보상은 없습니다!



#### 게임 씬

- 처음 생명력은 100으로 시작. 화면 우측 상단에 표시
- **살찜**: 음식에 닿으면 음식의 칼로리에 따라 잡채(-15), 송편(-20), 밥(-25), 파전(-30), 불고기(-35)의 생명력 감소
- **다이어트**: 플레이어가 움직인 거리/1000에 해당하는 생명력 회복
- 밀리초 단위로 생존 시간을 화면 우측 상단에 표시



![img](https://blog.kakaocdn.net/dn/cwWMcH/btsv9KTTfZC/9imJFTLh0vBDvWKR8D8do1/img.png)



- 캐릭터는 3가지 상태(가만히 서 있는 상태, 뛰는 상태, 충돌 상태)에 따라 애니메이션 변경



![img](https://blog.kakaocdn.net/dn/drPEot/btswPXcvELj/mqWo31umKTm2IgwkkWTdu1/img.png)

![img](https://blog.kakaocdn.net/dn/bjkl2r/btsv7Vhe6jN/8lr4BKbSeKcKqmk9uAYqyk/img.png)

![img](https://blog.kakaocdn.net/dn/coCdSh/btswJzJHieK/ej2BKkKKViCkUaJqXv7vQK/img.png)



#### 게임 오버 씬

- 생존 시간을 밀리초 단위로 스코어로 표시 (9000점->9초 생존)
- 사용자로부터 이름을 입력받아 저장을 누르면 스코어를 파이어베이스 서버에 저장



![img](https://blog.kakaocdn.net/dn/bEFzEa/btsv8zrw5oy/l2J7VxZKJ8uXRKEwrYw3Xk/img.png)



 

#### 리더 보드

- 파이어베이스 서버를 통해 순위표 정보를 1등부터 5등까지 가져와서 표시



![img](https://blog.kakaocdn.net/dn/cbgcbE/btswPZBojhE/r3oMznMs1X7VZK0jar6J0K/img.png)



## 기술 스택

게임 엔진: Phaser3

빌드: Vite

스코어 서버: Firebase











## 크레딧

캐릭터 에셋: https://grafxkid.itch.io/sprite-pack-7

배경 이미지: free background photos from https://pngtree.com/freebackground/winter-starry-moon-background_966509.html?sce=af&id=6163?sol=downref&id=bef

음식 에셋: 한국 음식 아이콘  제작자: [Freepik - Flaticon](https://www.flaticon.com/kr/free-icons/-)