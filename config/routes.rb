Rails.application.routes.draw do
  resources :message
  root "messages#index"
end
