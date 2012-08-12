class ExerciseController < ApplicationController

  def index

  end

  def questions
    test = Array.new

    test.push({ :praesens => "gehen", :praeteritum => "ging", :partizip => "gegangen", :attempts => 0})
    test.push({ :praesens => "springen", :praeteritum => "sprang", :partizip => "gesprungen", :attempts => 0})
    test.push({ :praesens => "trinken", :praeteritum => "trank", :partizip => "getrunken", :attempts => 0})
    test.push({ :praesens => "schwimmen", :praeteritum => "schwamm", :partizip => "geschwommen", :attempts => 0})
    test.push({ :praesens => "wachsen", :praeteritum => "wuchs", :partizip => "gewachsen", :attempts => 0})
    test.push({ :praesens => "sterben", :praeteritum => "starb", :partizip => "gestorben", :attempts => 0})

    response.headers["Content-Type"] = "application/json; charset=utf-8"
    render :text => test.to_json
  end
end
