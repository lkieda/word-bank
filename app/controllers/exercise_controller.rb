require 'xmlsimple'

class ExerciseController < ApplicationController

  def index

  end

  def questions
    wordArray = Array.new
    words = XmlSimple.xml_in('data/146.xml', { 'KeyAttr' => 'name'})
    words['word'].each do |word|
      word['attempts'] = 0
      wordArray.push(word)
    end
    response.headers["Content-Type"] = "application/json; charset=utf-8"
    render :text => wordArray.shuffle[0..4].to_json
  end

end
