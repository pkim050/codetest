# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TodosController do
  describe 'routes' do
    it { is_expected.to route(:get, '/todos').to(action: :index) }
    it { is_expected.to route(:get, '/todos/1').to(action: :show, id: 1) }
    it { is_expected.to route(:post, '/todos').to(action: :create) }
    it { is_expected.to route(:patch, '/todos/1').to(action: :update, id: 1) }
    it { is_expected.to route(:delete, '/todos/1').to(action: :destroy, id: 1) }
  end
end
