class PublicQuizController < ApplicationController
  def attempt_quiz
    tour_session = TourSession.where(passphrase: params[:id])
    return redirect_error_page(403) unless tour_session.exists?
    session[:tour_session] = tour_session.first.id
    @quiz_data = quiz_data(tour_session.first.tour.id)
    @quiz_data = @quiz_data.as_json
    @tour = Tour.find(tour_session.first.tour.id)
    api_response(@quiz_data)
  end

  def submit_question
    return render json: ['No Tour Session'] if session[:tour_session].nil?
    return render json: ['No answer'] if params[:answer].nil?
    answer = Answer.find(params[:answer][:id])
    question_id = params[:question][:id]
    analayse_answer(question_id, answer)
  end

  def analayse_answer(question_id, answer)
    if answer.is_correct
      increment_question_correct(question_id)
      render json: { correct: true }
    else
      increment_question_wrong(question_id)
      answer = Answer.where(question_id: question_id, is_correct: true).first
      render json: { correct: false, answer: answer.as_json }
    end
    session[question_id.to_sym] = 'Answered'
  end

  def correct_answer(question_id)
    Answer.where(question_id: question_id, is_correct: true).first
  end

  def increment_question_correct(question_id)
    if session[question_id.to_sym].nil?
      question = Question.find(question_id)
      current = question.correctly_answered
      question.update_attribute(:correctly_answered, current + 1)
    end
  end

  def increment_question_wrong(question_id)
    if session[question_id.to_sym].nil?
      question = Question.find(question_id)
      current = question.wrongly_answered
      question.update_attribute(:wrongly_answered, current + 1)
    end
  end
end
