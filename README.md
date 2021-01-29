# Tukecholl
自身の転職活動用ポートフォリオとして制作した家計簿アプリです。  
Typescript, Go, React, Redux, Kubernetesを用いたマイクロサービスアーキテクチャです。

## 制作背景
現在友人と4人でシェアハウスしており、家賃、食費、日用品等、全員で費用を出し合って生活しています。  

そんな中シェアハウス内での支出を管理したいという事で家計簿アプリを探しましたが、個人に特化した家計簿アプリがほとんどで、グループ機能があったとしても私達の要件を満たせるようなアプリが見つかりませんでした。  

このような経緯から、家計簿アプリの定番機能である収支管理、予算管理等は実装した上で、グループ内での月末精算、買い物予定リスト、TODOリスト、料理当番や洗濯当番などのシフト管理等、シェアハウスに特化した機能があると便利だと思い制作しました。  

また、シェアハウスしている方以外にも、家族や夫婦、カップル等、同じような不便を感じられてる方々に使用して頂けるサービスを作りたいと考えました。

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
https://github.com/paypay3/kakeibo-app-api

- Terraform / 平 侑祐（共同開発者）  
https://github.com/paypay3/kakeibo-app-terraform

- Kubernetes / 平 侑祐（共同開発者）  
https://github.com/paypay3/kakeibo-app-kubernetes


**<ins>開発手法</ins>**
- アジャイル開発（スクラム）

**<ins>コミュニケーションツール</ins>**
- Slack
- Trello
- Googleスプレッドシート

## 使用技術
### 【 _Frontend_ 】
**<ins>Language</ins>**
- TypeScript v4.1.2
- Sass

**<ins>Library/Framework</ins>**
- React v17.0.1
- Redux v4.0.5
- redux-thunk v2.3.0
- reselect v4.0.0
- react-router v5.2.0
- react-router-dom v5.2.0
- history v4.10.1
- axios v0.21.1
- node-sass v4.14.1
- recharts v1.8.5

### 【 _Backend_ 】
**<ins>Language</ins>**
- Go v1.15.5

### 【 _Infrastructure_ 】
**<ins>Cloud Service</ins>**
- AWS

**<ins>Infrastructure as Code</ins>**
- Terraform v0.13.5
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
- docker v19.03.13
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
- Kustomize v3.8.7

**<ins>CI/CD</ins>**
- GitHub Actions
- ArgoCD

## 課題と今後実装したい機能
- レスポンシブデザインの実装。
- E2Eテストの実装。 
- Middlewareで実行する非同期関数をCRUDのみのシンプルな実装に修正。