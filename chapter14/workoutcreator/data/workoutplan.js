import EventBus from './eventbus.js';

export default {
    get PLAYLIST_UPDATE_EVENT() { return 'onPlaylistTimeUpdate'; },

    get WORKOUT_PLAN_CHANGE_EVENT() { return 'onWorkoutPlanChange'; },
    get WORKOUT_PLAN_ADD_ACTION() { return 'workoutPlanAddAction'; },
    get WORKOUT_PLAN_DELETE_ACTION() { return 'workoutDeleteAction'; },
    get WORKOUT_PLAN_CLEAR_ACTION() { return 'workoutClearAction'; },
    get WORKOUT_PLAN_LOAD_ACTION() { return 'workoutLoadAction'; },
    get WORKOUT_PLAN_EDIT_ACTION() { return 'workoutEditAction'; },

    play() {
        if (!this._seconds) {
            this._seconds = 0;
        }
        this._timer = setInterval( () => {
            this._seconds ++;
            this.updateTime(this._seconds);
        }, 1000);
    },

    stop() {
        this._seconds = 0;
        clearInterval(this._timer);

        let ce = new CustomEvent(this.PLAYLIST_UPDATE_EVENT, {
            detail: {
                exercise: null,
                exerciseChanged: true,
                exerciseIndex: -1,
                time: 0,
            }});
        EventBus.dispatchEvent(ce);
    },

    pause() {
        clearInterval(this._timer);
    },

    getExerciseStartTime(exercise) {
        let time = 0;
        for (let c = 0; c < this._currentWorkout.length; c++) {
            if (this._currentWorkout[c].id === exercise.id) {
                return time;
            }
            time += this.getDurationOfExercise(this._currentWorkout[c]);
        }
    },

    getExerciseForTime(seconds) {
        let startTime = 0;
        for (let c = 0; c < this._currentWorkout.length; c++) {
            let duration = this.getDurationOfExercise(this._currentWorkout[c]);
            if (seconds <= startTime + duration && seconds >= startTime) {
                return this._currentWorkout[c];
            }
            startTime += duration;
        }
    },

    updateTime(seconds) {
        let exercise = this.getExerciseForTime(seconds);
        let exerciseChanged = false;
        if (this._currentExercise !== exercise) {
            this._currentExercise = exercise;
            exerciseChanged = true;
        }

        let ce = new CustomEvent(this.PLAYLIST_UPDATE_EVENT, {
            detail: {
                exercise: this._currentExercise,
                exerciseChanged: exerciseChanged,
                exerciseIndex: this._currentWorkout.indexOf(this._currentExercise),
                time: seconds,
            }});
        EventBus.dispatchEvent(ce);
    },

    get saved() {
        const savedplans = [];
        Object.keys(localStorage).forEach(function(key){
            savedplans.push(key);
        });
        return savedplans;
    },

    get currentExercise() {
        if (!this._currentExercise) {
            this._currentExercise = this._currentWorkout[0];
        }
        return this._currentExercise;
    },

    get exercises() {
        if (!this._currentWorkout) {
            this._currentWorkout = [];
        }
        return this._currentWorkout;
    },

    save(name) {
        localStorage.setItem(name, JSON.stringify(this._currentWorkout));
    },

    load(key) {
        this._currentWorkout = JSON.parse(localStorage.getItem(key));

        let ce = new CustomEvent(this.WORKOUT_PLAN_CHANGE_EVENT, {
            detail: {
                action: this.WORKOUT_PLAN_LOAD_ACTION,
                exercises: this._currentWorkout,
                duration: this.totalDuration
            }});
        EventBus.dispatchEvent(ce);
    },

    edit(id, key, value) {
        let exercise;
        for (let c = 0; c < this._currentWorkout.length; c++) {
            if (id === this._currentWorkout[c].id) {
                exercise = this._currentWorkout[c];
                exercise[key] = value;
            }
        }

        let ce = new CustomEvent(this.WORKOUT_PLAN_CHANGE_EVENT, {
            detail: {
                action: this.WORKOUT_PLAN_EDIT_ACTION,
                exercise: exercise,
                duration: this.totalDuration
            }});
        EventBus.dispatchEvent(ce);
    },

    add(exercise) {
        if (!this._currentWorkout) {
            this._currentWorkout = [];
        }
        exercise.id = this.createID();
        this._currentWorkout.push(exercise);

        let ce = new CustomEvent(this.WORKOUT_PLAN_CHANGE_EVENT, {
            detail: {
                action: this.WORKOUT_PLAN_ADD_ACTION,
                exercise: exercise,
                duration: this.totalDuration
            }});
        EventBus.dispatchEvent(ce);
    },

    getDurationOfExercise(exercise) {
        if (exercise.time) {
           return exercise.time * exercise.sets;
        } else {
            return exercise.estimatedTimePerCount *  exercise.count * exercise.sets;
        }
    },

    remove(id) {
        if (!this._currentWorkout) { return; }
        for (let c = 0; c < this._currentWorkout.length; c++) {
            if (this._currentWorkout[c].id === id) {
                const deleted = this._currentWorkout.splice(c, 1);
                let ce = new CustomEvent(this.WORKOUT_PLAN_CHANGE_EVENT, {
                    detail: {
                        action: this.WORKOUT_PLAN_DELETE_ACTION,
                        exercise: deleted[0],
                        duration: this.totalDuration
                    }});
                EventBus.dispatchEvent(ce);
                return;
            }
        }
    },

    clear() {
        this._currentWorkout = [];
        let ce = new CustomEvent(this.WORKOUT_PLAN_CHANGE_EVENT, {
            detail: {
                action: this.WORKOUT_PLAN_CLEAR_ACTION,
                duration: this.totalDuration
            }});
        EventBus.dispatchEvent(ce);
    },

    get totalDuration() {
        let ttlTime = 0;
        for (let c = 0; c < this._currentWorkout.length; c++) {
            ttlTime += this.getDurationOfExercise(this._currentWorkout[c]);
        }
        return ttlTime;
    },

    formatTime(seconds) {
        return new Date(1000 * seconds).toISOString().substr(11, 8);
    },

    createID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}
