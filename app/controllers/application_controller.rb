class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern

  def after_sign_in_path_for(resource)
    if current_user.admin?
      admin_dashboards_path
    else
      dashboards_path
    end
  end
end
