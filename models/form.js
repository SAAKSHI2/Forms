import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  text: String,
});

const questionSchema = new mongoose.Schema({
  text: String,
  type: {
    type: String,
    enum: ['shortAnswer', 'dropdown', 'multipleChoice', 'checkbox'],
  },
  options: {
    type: [String],
    validate: {
        validator: function(options) {
          return this.type !== 'shortAnswer' || (options && options.length === 0);
        },
        message: 'Options are not allowed for short answer questions',
    }
  },
  answers:  {
    type: [answerSchema],
    validate: [
      {
        validator: function(answers) {
          return this.type !== 'shortAnswer' || (answers && answers.length === 1);
        },
        message: 'Only one answer is allowed for shortAnswer type questions',
      },
      {
        validator: function(answers) {
            return (this.type !== 'checkbox' && this.type !== 'dropdown') || (answers && answers.length <= 1);
        },
        message: 'Only one answer should be selected for checkbox or dropdown questions',
      },
    ],
  },
  required: {
    type: Boolean,
    default: false,
  },

  toggleExplanation: {
    type: Boolean,
    default: false,
  },

  explanation: {
    type: String,
    validate: [
        {
          validator: function(explanation) {
            return !(this.toggleExplanation === false && explanation);
          },
          message: 'Explanation should not be provided when toggleExplanation is false',
        },
        {
          validator: function(explanation) {
            return this.toggleExplanation ? (explanation && explanation.length > 0) : true;
          },
          message: 'Explanation is required when toggleExplanation is true',
        },
      ],
  }

});


const sectionSchema = new mongoose.Schema({
  name: String,
  questions: [questionSchema],
});


const formSchema = new mongoose.Schema({
  title: String,
  sections: [sectionSchema],
});

const Form = mongoose.model('Form', formSchema);

export default Form;
