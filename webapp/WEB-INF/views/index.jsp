<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="kme" uri="http://kuali.org/mobility" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TWEETS!!!!</title>
  </head>
  <body>
	<h1>TWEETS!!!!</h1>
	<kme:listView id="tweetList" filter="false">
	        <c:forEach items="${tweets}" var="tweet">
	                <kme:listItem hideDataIcon="true">
	                        @${tweet.getUser().getScreenName()} - "${status.getText()}"
	                </kme:listItem>
	        </c:forEach>
	</kme:listView>
  </body>
</html>



