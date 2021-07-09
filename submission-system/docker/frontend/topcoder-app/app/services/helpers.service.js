import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tc.services').factory('Helpers', Helpers)

  Helpers.$inject = ['$window', '$location', '$state', '$http', '$filter', 'ISO3166']

  function Helpers($window, $location, $state, $http, $filter, ISO3166) {
    var service = {
      storeById: storeById,
      parseQuestions: parseQuestions,
      parseAnswers: parseAnswers,
      compileReviewItems: compileReviewItems,
      countCompleted: countCompleted,
      getParameterByName: getParameterByName,
      getPageTitle: getPageTitle,
      isEmail: isEmail,
      getCountyObjFromIP: getCountyObjFromIP,
      redirectPostLogin: redirectPostLogin,
      getSocialUserData: getSocialUserData,
      setupLoginEventMetrics: setupLoginEventMetrics,
      npad: npad,
      isValidMIMEType: isValidMIMEType
    }
    return service

    /////////////////////

    function getSocialUserData(profile, accessToken) {
      var socialProvider = profile.identities[0].connection
      var firstName = '',
        lastName = '',
        handle = '',
        email = ''

      var socialUserId = profile.user_id.substring(profile.user_id.lastIndexOf('|') + 1)
      var splitName

      if (socialProvider === 'google-oauth2') {
        firstName = profile.given_name
        lastName = profile.family_name
        handle = profile.nickname
        email = profile.email
      } else if (socialProvider === 'facebook') {
        firstName = profile.given_name
        lastName = profile.family_name
        handle = firstName + '.' + lastName
        email = profile.email
      } else if (socialProvider === 'twitter') {
        splitName = profile.name.split(' ')
        firstName = splitName[0]
        if (splitName.length > 1) {
          lastName = splitName[1]
        }
        handle = profile.screen_name
      } else if (socialProvider === 'github') {
        splitName = profile.name.split(' ')
        firstName = splitName[0]
        if (splitName.length > 1) {
          lastName = splitName[1]
        }
        handle = profile.nickname
        email = profile.email
      } else if (socialProvider === 'bitbucket') {
        firstName = profile.first_name
        lastName = profile.last_name
        handle = profile.username
        email = profile.email
      } else if (socialProvider === 'stackoverflow') {
        firstName = profile.first_name
        lastName = profile.last_name
        handle = socialUserId
        email = profile.email
      } else if (socialProvider === 'dribbble') {
        firstName = profile.first_name
        lastName = profile.last_name
        handle = socialUserId
        email = profile.email
      }

      var token = accessToken
      var tokenSecret = null
      if (profile.identities && profile.identities.length > 0) {
        token = profile.identities[0].access_token
        tokenSecret = profile.identities[0].access_token_secret
      }
      return {
        socialUserId: socialUserId,
        username: handle,
        firstname: firstName,
        lastname: lastName,
        email: email,
        socialProfile: profile,
        socialProvider: socialProvider,
        accessToken: token,
        accessTokenSecret : tokenSecret
      }
    }

    function storeById(object, questions) {
      angular.forEach(questions, function(question) {
        object[question.id] = question
      })
    }

    function parseQuestions(questions) {
      angular.forEach(questions, function(question) {
        if (question.questionTypeId === 5) {
          question.description = question.description
          question.guidelines = question.guideline.split('\n')
        }
      })
    }

    function parseAnswers(questions, answers) {
      var saved = false
      angular.forEach(answers, function(answerObject) {
        var questionId = answerObject.scorecardQuestionId

        questions[questionId].answer = answerObject.answer
        questions[questionId].reviewItemId = answerObject.id

        if (answerObject.comments && answerObject.comments.length > 0) {
          // pick first comment for peer review challenges
          // does not handle displaying multiple comments yet
          questions[questionId].comment = answerObject.comments[0].content
          questions[questionId].commentId = answerObject.comments[0].id
        }

        if (answerObject.answer !== '') {
          saved = true
        }
      })

      return saved
    }

    function compileReviewItems(questions, review, updating) {
      var reviewItems = []

      for (var qId in questions) {
        var q = questions[qId]

        var reviewItem = {
          reviewId: review.id,
          scorecardQuestionId: parseInt(qId),
          uploadId: review.uploadId,
          answer: '' + q.answer
        }

        reviewItem.comments = [
          {
            content: '' + q.comment,
            id: q.commentId,
            resourceId: review.resourceId,
            commentTypeId: 1,
            reviewItemId: q.reviewItemId
          }
        ]

        if (updating) {
          reviewItem.id = q.reviewItemId
        }
        reviewItems.push(reviewItem)
      }
      return reviewItems
    }

    function countCompleted(reviews) {
      return reviews.reduce(function(numCompleted, review) {
        if (review.committed === 1) {
          return numCompleted + 1
        }
        return numCompleted
      }, 0)
    }

    function getParameterByName(name, url) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
      var results = regex.exec(url)
      if (results === null) {
        results = ''
      } else {
        results = $window.decodeURIComponent(results[1].replace(/\+/g, ' '))
      }
      return results
    }

    /**
     * Given a string of the type 'object.property.property', traverse the given context (eg the current $state object) and return the
     * value found at that path.
     *
     * @param objectPath
     * @param context
     * @returns {*}
     */
    function _getObjectValue(objectPath, context) {
      var i
      var propertyArray = objectPath.split('.')
      var propertyReference = context
      for (i = 0; i < propertyArray.length; i++) {
        if (angular.isDefined(propertyReference[propertyArray[i]])) {
          propertyReference = propertyReference[propertyArray[i]]
        } else {
          // if the specified property was not found, default to the state's name
          return undefined
        }
      }
      return propertyReference
    }

    /**
     *
     * @param template
     * @param context
     * @returns {*}
     */
    function _renderTemplateStr(template, context) {
      var str2BCompiled = template.match(/{{[.\w]+}}/g)
      var compiledMap = {}
      if (str2BCompiled) {
        str2BCompiled.forEach(function(str) {
          var expr = str.replace('{{', '').replace('}}', '')
          compiledMap[str] = _getObjectValue(expr.trim(), context)
        })
        // now loop over all keys and replace with compiled value
        Object.keys(compiledMap).forEach(function(k) {
          template = template.replace(k, (compiledMap[k] ? compiledMap[k] : ''))
        })
      }
      return template
    }


    function getPageTitle(state, $currentState) {
      var title = ''
      if (state.data && state.data.title) {
        title = state.data.title
        if (title.indexOf('{{') > -1) {
          // dynamic data
          var resolveData = $currentState.locals.resolve.$$values
          title = _renderTemplateStr(title, resolveData)
        }
      }
      if (title) {
        title += ' | '
      }
      return title + 'TopCoder'
    }

    function isEmail(value) {
      var re = /^(([^<>()[\]\.,:\s@\"]+(\.[^<>()[\]\.,:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,:\s@\"]+\.)+[^<>()[\]\.,:\s@\"]{2,})$/i
      return re.test(value)
    }

    function getCountyObjFromIP() {
      return $http({
        method: 'GET',
        url: 'http://ipinfo.io',
        skipAuthorization: true
      })
      .then(function(data) {
        if (data.data && data.data.country) {
          return ISO3166.getCountryObjFromAlpha2(data.data.country)
        }
        return null
      }, function(err) {
        // unable to lookup ip address
        return null
      })
    }

    function redirectPostLogin(nextParam) {
      // make sure domain is topcoder | dev | qa
      nextParam = decodeURIComponent(nextParam)
      var re1 = /^(https?:\/\/)*(\w+\.)*topcoder(-\w+)*\.com/
      var re2 = /^\/\w+/

      if (re1.test(nextParam)) {
        $window.location.href = nextParam
      } else if (re2.test(nextParam)) {
        $location.url(nextParam)
      } else {
        $state.go('dashboard')
      }
    }

    function setupLoginEventMetrics (usernameOrEmail) {
      if ($window._kmq) {
        $window._kmq.push(['identify', usernameOrEmail ])
      }
    }

    function npad(toPad, n) {
      return $filter('npad')(toPad, n)
    }

    function isValidMIMEType(mimeType, fileExt) {
      var areStrings = _.isString(mimeType) && _.isString(fileExt)

      if (!areStrings) {
        return false
      }

      var mimeTypesByExtension = {
        zip: [
          'application/zip',
          'application/x-zip',
          'application/x-zip-compressed',
          'application/octet-stream',
          'application/x-compress',
          'application/x-compressed',
          'multipart/x-zip',
          'application/x-download'
        ],
        jpeg: [
          'image/jpeg',
          'image/jpg',
          'image/jpe_',
          'image/pjpeg',
          'image/vnd.swiftview-jpeg'
        ],
        jpg: [
          'image/jpeg',
          'image/jpg',
          'image/jp_',
          'application/jpg',
          'application/x-jpg',
          'image/pjpeg',
          'image/pipeg',
          'image/vnd.swiftview-jpeg',
          'image/x-xbitmap'
        ],
        png: [
          'image/png',
          'application/png',
          'application/x-png'
        ]
      }

      return _.some(mimeTypesByExtension[fileExt], _.matches(mimeType))
    }
  }
})()
