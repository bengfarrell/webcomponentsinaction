import Template from './template.js';

export default class ExerciseLibrary extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = Template.render([
            { label: 'Jump Rope', type: 'cardio', thumb: 'https://blog.freepeople.com/wp-content/uploads/2016/12/JumpRope.gif', time: 300, sets: 1},
            { label: 'Jog', type: 'cardio', thumb: 'https://66.media.tumblr.com/cc54c11df4ad19558f1f22f9a42e6677/tumblr_pfn9twddyU1vtnv5po1_500.gif', time: 300, sets: 1},
            { label: 'Pushups', type: 'strength', thumb: 'https://www.healthline.com/hlcmsresource/images/topic_centers/Fitness-Exercise/400x400_What_Muscles_Do_Pushups_Work_Standard_Pushup.gif', count: 5, sets: 2, estimatedTimePerCount: 5 },
            { label: 'Pullups', type: 'strength', thumb: 'https://thumbs.gfycat.com/LonelyBlondEstuarinecrocodile-small.gif', count: 5, sets: 2, estimatedTimePerCount: 5},
            { label: 'Chin ups', type: 'strength', thumb: 'https://i1.wp.com/www.garmaonhealth.com/wp-content/uploads/2017/01/chinup.gif?ssl=1', count: 5, sets: 2, estimatedTimePerCount: 5},
            { label: 'Plank', type: 'strength', thumb: 'https://thumbs.gfycat.com/ShorttermPepperyDartfrog-max-1mb.gif', time: 60, sets: 1},
            { label: 'Lunges', type: 'strength', thumb: 'https://greatist.com/sites/default/files/PERFECT-SERIES_LUNGE_MISTAKES_LUNGING-ON-TIGHTROPE_GRAIN_compressed.gif', count: 10, sets: 2, estimatedTimePerCount: 2},
            { label: 'Hip Raises', type: 'strength', thumb: 'https://d2m3klzcmjgreb.cloudfront.net/wp-content/uploads/2015/10/ac338bbf-85a1-462a-a2ed-4afa96907ebb.gif', count: 10, sets: 1, estimatedTimePerCount: 5},
            { label: 'Squats', type: 'strength', thumb: 'https://media.giphy.com/media/xHvxJZqio93VK/giphy.gif', count: 10, sets: 1, estimatedTimePerCount: 5},
            { label: 'Burpees', type: 'strength', thumb: 'https://static1.squarespace.com/static/590369cebebafbf0afc913b1/t/5a7b6c7071c10bb2da561a1b/1518038135421/giphy+%287%29.gif', count: 5, sets: 2, estimatedTimePerCount: 5},
            { label: 'Step Up', type: 'strength', thumb: 'https://i.gifer.com/JwRY.gif', count: 10, sets: 2, estimatedTimePerCount: 5},
            { label: 'Calf Raise', type: 'strength', thumb: 'https://www.healthline.com/hlcmsresource/images/topic_centers/Fitness-Exercise/400x400_How_to_Get_Rid_of_Cankles_Stair_Calf_Raises.gif', count: 10, sets: 2, estimatedTimePerCount: 5},
            { label: 'Arm Circles', type: 'strength', thumb: 'https://thumbs.gfycat.com/SpicyBogusLaughingthrush-size_restricted.gif', count: 10, sets: 2, estimatedTimePerCount: 2},
            { label: 'High Knees', type: 'cardio', thumb: 'https://media.giphy.com/media/LROOLPs8U8gRG/source.gif', count: 10, sets: 2, estimatedTimePerCount: 2},
            { label: 'Jumping Jacks', type: 'cardio', thumb: 'https://d39ziaow49lrgk.cloudfront.net/wp-content/uploads/2016/03/Jumping-Jacks.gif', count: 10, sets: 2, estimatedTimePerCount: 1},
            { label: 'Side Plank', type: 'strength', thumb: 'https://i.makeagif.com/media/2-21-2014/LHF_Zd.gif', time: 20, sets: 1},
            { label: 'Situps', type: 'strength', thumb: 'https://media.giphy.com/media/10nN0goYG4UAtG/giphy.gif', count: 10, sets: 2, estimatedTimePerCount: 5},
            { label: 'Handstand Pushup', type: 'strength', thumb: 'http://i.imgur.com/HnQq7mO.gif', count: 5, sets: 2, estimatedTimePerCount: 10},
            { label: 'Dip', type: 'strength', thumb: 'https://media1.tenor.com/images/050b4d194ca74a7cfe427d018520216d/tenor.gif?itemid=5430498', count: 8, sets: 2, estimatedTimePerCount: 8},
            { label: 'Jump Squats', type: 'strength', thumb: 'https://media.giphy.com/media/p6ZymKJ7t7WBG/giphy.gif', count: 8, sets: 2, estimatedTimePerCount: 5},
            { label: 'Crab Walk', type: 'strength', thumb: 'http://gifimage.net/wp-content/uploads/2017/10/crab-walk-gif-7.gif', time: 30, sets: 1},
            { label: 'Bicycle Crunches', type: 'strength', thumb: 'https://i.pinimg.com/originals/0e/fb/2c/0efb2cb1085ba429c4e7e5081e20b415.gif', time: 30, sets: 1},
            ]);
    }
}

if (!customElements.get('wkout-exercise-lib')) {
    customElements.define('wkout-exercise-lib', ExerciseLibrary);
}