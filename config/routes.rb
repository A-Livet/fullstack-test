Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'static#index'

  get '/objectives', to: 'objective#index'
  post '/objectives', to: 'objective#create'
  put '/objectives/:id', to: 'objective#update'
  delete '/objectives/:id', to: 'objective#delete'
  
  get '/keyresults', to: 'key_result#index'
  post '/keyresults', to: 'key_result#create'
  put '/keyresults/:id', to: 'key_result#update'
  delete '/keyresults/:id', to: 'key_result#delete'
  get '/keyresults/objectives/:id', to:'key_result#get_from_objective'

end
