const fs = require('fs');
const path = require('path');

function checkIfSafe(levels) {
	const increasing = levels[0] < levels[1];
	let safe = true;
	for (let i = 0; i < levels.length; i++) {
		if (i === 0) continue;

		if (increasing) {
			if (levels[i] < levels[i - 1]) safe = false; break;
		} else if (!increasing) {
			if (levels[i] > levels[i - 1]) safe = false; break;
		}

		if (Math.abs(levels[i] - levels[i - 1]) > 3 || Math.abs(levels[i] - levels[i - 1]) === 0) safe = false; break;
	}

	return safe;
}
function part1() {
	const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
	let result = 0;

	const levelsList = [];
	for (const line of data.split('\n')) levelsList.push(line.split(' ').map(Number));

	for (const levels of levelsList) if (checkIfSafe(levels)) result++;

	return result;
}

function part2() {
	const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
	let result = 0;

	const levelsList = [];
	for (const line of data.split('\n')) levelsList.push(line.split(' ').map(Number));

	for (const levels of levelsList) {
		const safe = checkIfSafe(levels);

		if (safe) {
			result++;
		} else {
			for (let i = 0; i < levels.length; i++) {
				const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
				if (checkIfSafe(newLevels)) {
					result++;
					break;
				}
			}
		}
	}

	return result;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);

module.exports = {
	part1,
	part2,
};