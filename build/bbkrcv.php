<?php

$command = 'cd /var/www/bizt && /usr/bin/git pull https://kjsr71%40gmail.com:qlxmqjzlt1q2w%21%40@bitbucket.org/I4Chung/bizt_frontend.git master 2>&1';

$header = apache_request_headers();
$header = array_change_key_case($header);
if(strpos($header['user-agent'], 'Bitbucket-Webhooks') !== false) {
	$_JSON = json_decode(file_get_contents("php://input"), true);
	
	$info['branch'] = $_JSON['push']['changes'][0]['new']['name'];
	$info['author'] = $_JSON['push']['changes'][0]['new']['target']['author']['raw'] ?? '?';
	$info['nickname'] = $_JSON['push']['changes'][0]['new']['target']['author']['user']['nickname'] ?? '?';
	$info['message'] = $_JSON['push']['changes'][0]['new']['target']['message'] ?? '?';
	
	$info = array_map('trim', $info);
	$info = array_map('addslashes', $info);
	
	if($info['branch'] === 'master') {
		$output = shell_exec($command);
	}
	$info['message'] = str_replace("'", "`", $info['message']);
	$postData = '{ "conversation_id": "923120", "text": "푸쉬 알림('.$header['host'].')\n등록자: '.$info['nickname'].'('.$info['author'].')\n브랜치: '.$info['branch'].'\n메시지: '.$info['message'].'" }';
	$ch = curl_init();
	
	curl_setopt($ch, CURLOPT_URL, 'https://api.kakaowork.com/v1/messages.send');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
	
	$headers = array();
	$headers[] = 'Authorization: Bearer d44622c0.02d6d465a76842f7b324caa509cdf140';
	$headers[] = 'Content-Type: application/json';
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	
	$result = curl_exec($ch);
	if (curl_errno($ch)) {
		echo 'Error:' . curl_error($ch);
	}
	
	curl_close($ch);
}
