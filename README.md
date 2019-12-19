# DB設計

## users table

|Column|Type|Options|
|------|----|-------|
|email|string|null: false,index: true,unique:true|
|password|string|null: false,index: true,unique:true|
|nickname|string|null: false,index: true,unique:true|

### Association
- has_many :groups, through: groups_users
- has_many :groups_users
- has_many :messages

## messages table

|Column|Type|Options|
|------|----|-------|
|text|text||
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groups table

|Column|Type|Options|
|------|----|-------|
|group|text||
|menber|text||
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :users
- belongs_to :user

## groups_users table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
