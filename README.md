# Tukecholl
自身の転職活動用ポートフォリオとして制作した家計簿アプリです。  
TypeScript, Go, React, Redux, Kubernetesを用いたマイクロサービスアーキテクチャです。

## 制作背景
現在友人と4人でシェアハウスしており、家賃、食費、日用品等、全員で費用を出し合って生活しています。  

そんな中シェアハウス内での支出を管理したいという事で家計簿アプリを探しましたが、個人に特化した家計簿アプリがほとんどで、グループ機能があったとしても私達の要件を満たせるようなアプリが見つかりませんでした。  

このような経緯から、家計簿アプリの定番機能である収支管理、予算管理等は実装した上で、グループ内での月末精算、買い物予定リスト、TODOリスト、料理当番や洗濯当番などのシフト管理等、シェアハウスに特化した機能があると便利だと思い制作しました。  

また、シェアハウスしている方以外にも、家族や夫婦、カップル等、同じような不便を感じられてる方々に使用して頂けるサービスを作りたいと考えました。

## WebサイトURL

https://www.shakepiper.com

※ 土・日曜日11:00 ~ 17:00稼働  
※ ログインページのゲストユーザーログインより、「 **郷ひろみ** 」として簡単ログインできます。

## 開発形態
**<ins>開発者</ins>**
- 安樂 亮佑  
- 古澤 宏弥  
- 伊藤 稜悟
- 平 侑祐  （共同開発者）

**<ins>制作物 / 担当</ins>**
- Frontend / 安樂 亮佑, 古澤 宏弥, 伊藤 稜悟  
https://github.com/ryo-wens/kakeibo-front

- API / 平 侑祐（共同開発者）  
https://github.com/hryze/kakeibo-app-api

- Terraform / 平 侑祐（共同開発者）  
https://github.com/hryze/kakeibo-app-terraform

- Kubernetes / 平 侑祐（共同開発者）  
https://github.com/hryze/kakeibo-app-kubernetes


**<ins>開発手法</ins>**
- アジャイル開発（スクラム）

**<ins>コミュニケーションツール</ins>**
- Slack
- Trello
- Googleスプレッドシート

## 使用技術
### 【 _Frontend_ 】
**<ins>Language</ins>**
- TypeScript v4.2.2
- Sass

**<ins>Library/Framework</ins>**
- Node.js v14.16.0
- React v17.0.1
- Redux v4.0.5
- redux-thunk v2.3.0
- reselect v4.0.0
- react-router v5.2.0
- react-router-dom v5.2.0
- history v4.10.1
- axios v0.21.1
- node-sass v5.0.0
- recharts v1.8.5

### 【 _Backend_ 】
**<ins>Language</ins>**
- Go v1.16.3

### 【 _Infrastructure_ 】
**<ins>Cloud Service</ins>**
- AWS

**<ins>Infrastructure as Code</ins>**
- Terraform v0.14.7
    - VPC
    - Subnet
    - Route Table
    - Internet Gateway
    - NAT Gateway
    - Security Group
    - EKS
    - ECR
    - S3
    - CloudFront
    - ELB
    - EC2
    - Route53
    - ACM
    - RDS(MySQL v8.0.20)
    - ElastiCache(Redis v5.0.6)
    - Secrets Manager
    - IAM

**<ins>Container</ins>**
- docker v20.10.2
- docker-compose v1.27.4（開発環境Database用）

**<ins>Container Orchestration</ins>**
- Kubernetes v1.18
    - api × 3
    - argocd
    - aws-load-balancer-controller
    - cert-manager
    - cluster-autoscaler
    - external-dns
    - external-secrets
    - initialize-rds-job
    - metrics-server
- Kustomize v4.0.4

**<ins>CI/CD</ins>**
- GitHub Actions
- ArgoCD

## インフラ構成図

![infra](https://user-images.githubusercontent.com/59386359/101023134-ad6ebb00-35b5-11eb-8fb8-58bc6e64eb5d.png)

## CI/CD pipeline

![ci-cd](https://user-images.githubusercontent.com/59386359/101271226-2e9b9d00-37c4-11eb-8842-8020fb66b11c.png)

## 機能一覧

### 【 個人利用機能 】

**<ins>ユーザー機能</ins>**

- ユーザー新規登録
- ユーザーログイン
- ユーザーログアウト

**<ins>家計簿機能</ins>**

- 月別家計簿取引一覧取得
- 家計簿取引最終更新10件取得
- 家計簿取引追加
- 家計簿取引更新
- 家計簿取引削除
- 家計簿取引検索

**<ins>家計簿予算機能</ins>**

- 標準予算取得
- 標準予算更新
- 月別カスタム予算取得
- 月別カスタム予算追加
- 月別カスタム予算更新
- 月別カスタム予算削除
- 年別予算一覧取得

**<ins>カテゴリー機能</ins>**

- カテゴリー一覧取得
- カスタムカテゴリー追加
- カスタムカテゴリー更新
- カスタムカテゴリー削除

**<ins>todo機能</ins>**

- 日別実施予定todo, 締切予定todo一覧取得
- 月別実施予定todo, 締切予定todo一覧取得
- 期限切れtodo一覧取得
- todo追加
- todo更新
- todo削除
- todo検索

**<ins>買い物リスト機能</ins>**

- 定期買い物リスト, 日別買い物リスト取得
- 定期買い物リスト, 月別買い物リスト取得
- 期限切れ買い物リスト取得
- 買い物リスト更新, 家計簿トランザクション自動追加/自動削除
- 買い物リスト削除
- 定期買い物リスト追加
- 定期買い物リスト更新
- 定期買い物リスト削除

### 【 グループ利用機能 】

**<ins>グループ機能</ins>**

- 承認グループ, 未承認グループ一覧取得
- グループ作成
- グループ名更新
- グループ招待
- グループ招待承認
- グループ招待拒否
- グループ退会

**<ins>グループ家計簿機能</ins>**

- 月別家計簿取引一覧取得
- 家計簿取引最終更新10件取得
- 家計簿取引追加
- 家計簿取引更新
- 家計簿取引削除
- 家計簿取引検索
- 年別家計簿取引会計状況一覧取得
- 月別家計簿取引自動会計
- 月別家計簿取引会計データ取得
- 月別家計簿取引会計データ更新
- 月別家計簿取引会計データ削除

**<ins>グループ予算機能</ins>**

- 標準予算取得
- 標準予算更新
- 月別カスタム予算取得
- 月別カスタム予算追加
- 月別カスタム予算更新
- 月別カスタム予算削除
- 年別予算一覧取得

**<ins>グループカテゴリー機能</ins>**

- カテゴリー一覧取得
- カスタムカテゴリー追加
- カスタムカテゴリー更新
- カスタムカテゴリー削除

**<ins>グループtodo機能</ins>**

- 日別実施予定todo, 締切予定todo一覧取得
- 月別実施予定todo, 締切予定todo一覧取得
- 期限切れtodo一覧取得
- todo追加
- todo更新
- todo削除
- todo検索

**<ins>グループ買い物リスト機能</ins>**

- 定期買い物リスト, 日別買い物リスト取得
- 定期買い物リスト, 月別買い物リスト取得
- 期限切れ買い物リスト取得
- 買い物リスト更新, 家計簿トランザクション自動追加/自動削除
- 買い物リスト削除
- 定期買い物リスト追加
- 定期買い物リスト更新
- 定期買い物リスト削除

**<ins>グループシフト管理機能</ins>**

- ユーザー別シフト一覧取得
- シフト機能用ユーザー追加
- シフト機能用ユーザー削除
- シフト機能用タスク一覧取得
- シフト機能用タスク追加
- シフト機能用タスク更新
- シフト機能用タスク削除

## 課題と今後実装したい機能
- レスポンシブデザインの実装。
- E2Eテストの実装。 