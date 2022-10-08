const input = document.querySelector('#input')
const searchBtn = document.querySelector('#search')
const alertText = document.querySelector('.alert-text')
const avatar = document.querySelector('.avatar')
const userFullName = document.querySelector('.name')
const userLogin = document.querySelector('.login')
const userDate = document.querySelector('.date')
const userBio = document.querySelector('.bio-paragraph')
const userRepos = document.querySelector('.repos-amount')
const userFollowers = document.querySelector('.followers-amount')
const userFollowing = document.querySelector('.following-amount')
const userLocation = document.querySelector('.user-location')
const userWebsite = document.querySelector('.user-website')
const userTwitter = document.querySelector('.user-twitter')
const userCompany = document.querySelector('.user-company')
let userName

function findUser() {
	userName = input.value
	fetch('https://api.github.com/users/' + userName)
		.then(res => {
			if (res.ok) {
				return res.json()
			} else {
				return Promise.reject(`HTTP ERROR: ${res.status}`)
			}
		})
		.then(res => {
			alertText.style.visibility = 'hidden'

			const resDate = res.created_at.slice(0, res.created_at.length - 10)
			const [year, month, day] = resDate.split('-')
			const result = [month, day, year].join('/')

			avatar.setAttribute('src', res.avatar_url)
			userFullName.innerHTML = res.name
			userLogin.innerHTML = '@' + res.login
			userDate.innerHTML = 'Joined ' + result
			userBio.innerHTML = res.bio
			userRepos.innerHTML = res.public_repos
			userFollowers.innerHTML = res.followers
			userFollowing.innerHTML = res.following
			userLocation.innerHTML = res.location === null ? 'Not Available' : res.location
			userWebsite.innerHTML = res.blog === '' ? 'Not Available' : res.blog
			userTwitter.innerHTML = res.twitter_username === null ? 'Not Available' : res.twitter_username
			userCompany.innerHTML = res.company === null ? 'Not Available' : res.comapny
		})
		.catch(error => {
			console.error(error)
			alertText.style.visibility = 'visible'
		})
}

searchBtn.addEventListener('click', findUser)
input.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		findUser()
	}
})
