Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'static#index'

  get '/objectives', to: 'objective#index'
  post '/objectives', to: 'objective#create'
  put '/objectives/:id', to: 'objective#update'
  
  get '/keyresults', to: 'key_result#index'
  post '/keyresults', to: 'key_result#create'


end
