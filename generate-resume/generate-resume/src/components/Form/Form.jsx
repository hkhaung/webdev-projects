import { useState, useEffect } from 'react';
import './Form.css'


function EducationForm({educationSections, setEducationSections}) {
	function addMoreSection() {
		setEducationSections([
			...educationSections,
			{id: educationSections.length, school: '', degree: '', start: '', end: ''},
		]);
	};

	function deleteBottomMostSection() {
		if (educationSections.length == 1) {
			return;
		}
		educationSections.pop()
		setEducationSections(educationSections.slice(0));
	}

	function handleInput(id, field, value) {
		const updatedSections = educationSections.map((section) => {
			if (section.id == id) {
				return {...section, [field]: value};
			}
			return section;
		});

		setEducationSections(updatedSections);
	}

	return (
		<fieldset>
			<div className='group-title'>Great! Let&apos;s do education!</div>
			{educationSections.map((section) => (
				<div key={section.id} className='education-section'>
					<div className='label-input-container'>
						<label>Enter your school name</label>
						<input type='text' id={`school-name-${section.id}`} onChange={(event) => handleInput(section.id, 'school', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>Degree</label>
						<input type='text' id={`degree-${section.id}`} onChange={(event) => handleInput(section.id, 'degree', event.target.value)}>
						</input>
					</div>

					<div className='label-input-container'>
						<label>Start</label>
						<input type='date' id={`start-${section.id}`} onChange={(event) => handleInput(section.id, 'start', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>End</label>
						<input type='date' id={`end-${section.id}`} onChange={(event) => handleInput(section.id, 'end', event.target.value)}></input>
					</div>
				</div>
			))}
			<div className='section-btns'>
				<button type='button' className='addmore-btn' onClick={addMoreSection}>Add more</button>
				<button type='button' className='delete-btn' onClick={deleteBottomMostSection}>Delete</button>
			</div>
		</fieldset>
	);
}

function ExperienceForm({experienceSections, setExperienceSections}) {
	const addMoreSection = () => {
		setExperienceSections([
			...experienceSections,
			{id: experienceSections.length + 1, school: '', degree: '', start: '', end: '', bulletPoints: ''},
		]);
	};

	const deleteBottomMostSection = () => {
		if (experienceSections.length == 1) {
			return;
		}
		experienceSections.pop()
		setExperienceSections(experienceSections.slice(0));
	}

	function handleInput(id, field, value) {
		const updatedSections = experienceSections.map((section) => {
			if (section.id == id) {
				return {...section, [field]: value};
			}
			return section;
		});

		setExperienceSections(updatedSections);
	}

	return (
		<fieldset>
			<div className='group-title'>Now, let&apos;s do experience!</div>
			{experienceSections.map((section) => (
				<div key={section.id} className='experience-section'>
					<div className='label-input-container'>
						<label>Company name</label>
						<input type='text' id={`company-${section.id}`} onChange={(event) => handleInput(section.id, 'company', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>Job title</label>
						<input type='text' id={`title-${section.id}`} onChange={(event) => handleInput(section.id, 'title', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>Start</label>
						<input type='date' id={`start-${section.id}`} onChange={(event) => handleInput(section.id, 'start', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>End</label>
						<input type='date' id={`end-${section.id}`} onChange={(event) => handleInput(section.id, 'end', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>Bullet points</label>
						<input type='text' id={`bulletPoints-${section.id}`} onChange={(event) => handleInput(section.id, 'bulletPoints', event.target.value)}></input>
					</div>
				</div>
			))}
			<div className='section-btns'>
				<button type='button' className='addmore-btn' onClick={addMoreSection}>Add more</button>
				<button type='button' className='delete-btn' onClick={deleteBottomMostSection}>Delete</button>
			</div>
		</fieldset>
	);
}


function UserInfo({userInfo, setUserInfo, educationSections, setEducationSections, experienceSections, setExperienceSections}) {
	function handleInput(field, value) {
		setUserInfo({...userInfo, [field]: value})
	}

	// useEffect(() => {
  //   console.log('Updated userInfo:', userInfo);
  // }, [userInfo]); // This runs every time userInfo changes

	return (
		<>
			<div className='basic section'>
				<fieldset>
					<div className='group-title'>Let&apos;s start with basic info</div>
					<div className='label-input-container'>
						<label>Your name</label>
						<input type='text' onChange={(event) => handleInput('name', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>City, State</label>
						<input type='text' onChange={(event) => handleInput('cityState', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>Phone Number</label>
						<input type='tel' onChange={(event) => handleInput('phone', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>Email</label>
						<input type='email' onChange={(event) => handleInput('email', event.target.value)}></input>
					</div>

					<div className='label-input-container'>
						<label>LinkedIn</label>
						<input type='text' onChange={(event) => handleInput('linkedin', event.target.value)}></input>
					</div>
				</fieldset>
			</div>

			<div className='education section'>
				<EducationForm educationSections={educationSections} setEducationSections={setEducationSections}/>
			</div>

			<div className='experience section'>
				<ExperienceForm experienceSections={experienceSections} setExperienceSections={setExperienceSections}/>
			</div>
		</>
	)
}

function Form() {
	function generate() {
		// for now, no formatting, just display it
		// and empty form inputs are filled in random strings of text

		function generateRandomString(length) {
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let result = '';
		
			for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * characters.length);
				result += characters.charAt(randomIndex);
			}
		
			return result;
		}

		function helper(key, value) {
			if (key === 'id') {
				return;
			}

			if (value === '') {
				value = generateRandomString(Math.random() * 25);
			}

			let pElement = document.createElement('p');
			pElement.textContent = `${key}: `;

			generatedDiv.append(pElement);

			// Typing effect
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
			let typedText = '';
			let index = 0;

			const interval = setInterval(() => {
				if (index < value.length) {
					typedText += value[index];
					pElement.textContent = `${key}: ${typedText}${characters[Math.floor(Math.random() * characters.length)]}`;
					index++;
				} else {
					pElement.textContent = `${key}: ${value}`;
					clearInterval(interval); // Stop the interval
				}
			}, 100);
		}

		const formElements = document.getElementsByTagName('form');
		formElements[0].style.display = 'none';

		let generatedDiv = document.createElement('div');
		generatedDiv.setAttribute('id', 'results-container');

		for (const [key, value] of Object.entries(userInfo)) {
			helper(key, value);
		}

		for (const objArray of [educationSections, experienceSections]) {
			for (const obj of objArray) {
				for (const [key, value] of Object.entries(obj)) {
					helper(key, value);
				}
			}
		}

		document.body.appendChild(generatedDiv);
	}

	const [userInfo, setUserInfo] = useState({name: '', cityState: '', phone: '', email: '', linkedIn: ''});
	const [educationSections, setEducationSections] = useState([{id: 0, school: '', degree: '', start: '', end: ''}]);
	const [experienceSections, setExperienceSections] = useState([{id: 0, company: '', title: '', start: '', end: '', bulletPoints: ''}]);

	return (
		<>
			<form>
				<UserInfo 
					userInfo={userInfo} setUserInfo={setUserInfo}
					educationSections={educationSections} setEducationSections={setEducationSections}
					experienceSections={experienceSections} setExperienceSections={setExperienceSections}
				/>

				<div id='generate'>
					<button type='button' id='generate-btn' onClick={generate}>Generate</button>
				</div>
			</form>
		</>
	)
}

export default Form;