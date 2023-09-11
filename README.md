<!-- 
使用须知
	1.上一级目录必须包含
		cert：证书文件夹，https域名证书
		db_config：文件夹，server里有,内封装了一个query（超级简单好用容读）
	2.node包(package.json)
		npm i
	3.数据库导入
		antique（1）.sql用于创建数据库（16张表烦死人）
	4.custom_multer里的文件存放位置一定要和自己服务器的目录相对应
	5.如果用途在正式开发环境，记得在pages/store里自主添加支付环境
	6.编译代码时，如若出现图片资源加载失败，请查看自行修改图片url（原url是我的服务器）
 -->