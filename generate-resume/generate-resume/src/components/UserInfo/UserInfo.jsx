import { useState, useEffect } from 'react';
import './UserInfo.css'


function EducationForm() {
	const [educationSections, setEducationSections] = useState([
		{ id: 0, school: '', degree: '', start: '', end: '' },
	]);

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

function ExperienceForm() {
	const [experienceSections, setExperienceSections] = useState([
		{id: 0, company: '', title: '', start: '', end: '', bulletPoints: ''}
	]);

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
		console.log(updatedSections);
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


function UserInfo() {
	const [userInfo, setUserInfo] = useState({name: '', cityState: '', phone: '', email: '', linkedIn: ''});

	function handleInput(field, value) {
		setUserInfo({...userInfo, [field]: value})
		console.log(userInfo);
	}

	// useEffect(() => {
  //   console.log('Updated userInfo:', userInfo);
  // }, [userInfo]); // This runs every time userInfo changes

	const handleClick = () => {
		document.body.innerHTML = '';
	}

	return (
		<div>
			<form>
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

				<div className='education section'>
					<EducationForm />
				</div>

				<div className='experience section'>
					<ExperienceForm />
				</div>
				
				<button id='start-btn' onClick={handleClick}>Generate</button>
			</form>
		</div>
	)
}

export default UserInfo;